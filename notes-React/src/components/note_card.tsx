import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps{
    note:{
        id: string
        date: Date
        content: string
    }
    onNoteDeletion: (id: string) =>void
}

export function NoteCard({note, onNoteDeletion}: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400 outline-none relative overflow-hidden'>
                <span className='text-slate-300 text-sm font-medium'>
                    {formatDistanceToNow(  note.date,  {locale: ptBR, addSuffix: true} )}
                </span>

                <p className='text-slate-400 text-sm leading-6'>
                    {note.content.toString()}              
                </p>

                <div className=' absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0' />
            </Dialog.Trigger>


            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
                    
                    <Dialog.Close className=' absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-500 hover:text-slate-100'>
                        <X className='size-5'/>
                    </Dialog.Close>
            
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className='text-slate-300 text-sm font-medium'>
                        {formatDistanceToNow(  note.date, {locale: ptBR, addSuffix: true} )}
                    </span>
                    <p className='text-slate-400 text-sm leading-6'>
                        { note.content.toString()}              
                    </p>
                    </div> 

                    <button
                     type = 'button'
                     className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group' 
                     onClick={()=>{onNoteDeletion(note.id)}}
                    >
                        Deseja <span className='text-red-400 group-hover:underline'>apagar esta nota?</span>
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}