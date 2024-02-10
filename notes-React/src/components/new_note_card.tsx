import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteProps{
    onNoteCreation: (content: string) => void
}   
let speechRecognition: SpeechRecognition | null = null

export function NewNote({onNoteCreation}: NewNoteProps) {

    const [showOnboarding, setShowOnboarding] = useState(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)


    function handleOnboarding(){
        setShowOnboarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)

        if(event.target.value == ''){
            setShowOnboarding(true)
        }
    }

    function handleStartRecording(){
        

        const isSpeechRecognitionApiAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window

        if(!isSpeechRecognitionApiAvailable){
            alert('Infelizmente seu navegador não suporta a API de gravação.')
            return
        }

        setIsRecording(true)
        setShowOnboarding(false)

        const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition


        speechRecognition = new SpeechRecognitionApi()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) =>{
            const transcription = Array.from(event.results).reduce((text,result)=>{
                return text.concat(result[0].transcript)
            },'')
            setContent(transcription)
        }

        speechRecognition.onerror = (event) =>{
            console.error(event)
        }

        speechRecognition.start()
    }

    function handleStopRecording(){
        setIsRecording(false)
        if (speechRecognition != null){
            speechRecognition.stop()
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()
        console.log(content)

        if(content != ''){

            onNoteCreation(content)
            setContent('')
            setShowOnboarding(true)
            toast.success('Nota criada com sucesso')
        }
        else{
            toast.error('Nota não pode ser vazia')
        }
        


    }

    return (

        <Dialog.Root>

            <Dialog.Trigger className=' rounded-md overflow-hidden  text-left flex-col   bg-slate-700 p-5 gap-y-3  hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none relative'>

                <span className='text-slate-200 text-sm font-medium'>

                    Adicionar nota
                </span>

                <p className='text-slate-400 text-sm leading-6'>

                Comece  <span className='text-lime-400'>gravando uma nota em áudio</span> ou se preferir <span className='text-lime-400'>utilize apenas texto.</span>

                </p>

            </Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className=' inset-0 fixed bg-black/60' />

                <Dialog.Content className=' fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none '>

                    <Dialog.Close className=' absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-500 hover:text-slate-100'>

                        <X className='size-5' />

                    </Dialog.Close>

                    <form className='flex-1 flex flex-col'>

                        <div className='flex flex-1 flex-col gap-3 p-5'>

                            <span className='text-slate-300 text-sm font-medium'>

                                Adicionar nota

                            </span>
                            {showOnboarding ? (

                                <p className='text-slate-400 text-sm leading-6'>

                                Comece  <button type= 'button' onClick={handleStartRecording} className='text-lime-400 hover:underline'>gravando uma nota em áudio</button> ou se preferir <button type= 'button' onClick={ handleOnboarding } className='text-lime-400 hover:underline'>utilize apenas texto</button>.

                                </p>

                            ) : (

                                <textarea 

                                    autoFocus 

                                    className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none ' 

                                    onChange = {handleContentChanged}

                                    value={content}

                                    />
                                    
                            )}
                            
                        </div>
                        
                        {isRecording ? (
                            <button

                            type='button'

                            className='w-full bg-slate-900 py-4 flex items-center  justify-center gap-2 text-center text-sm text-slate-300 outline-none font-medium hover:underline hover:text-slate-100'

                            onClick={handleStopRecording}

                            >
                                <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                                Gravando (Clique para interromper)

                            </button>

                        )
                        :(
                            <button

                            type='button'

                            onClick={handleSaveNote}

                            className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:underline hover:bg-lime-500'

                            >
                                Salvar Nota

                            </button>
                        )
                        }

                    </form>

                </Dialog.Content>

            </Dialog.Portal>

        </Dialog.Root>
    )
}