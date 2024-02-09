import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function NewNote() {
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
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-slate-300 text-sm font-medium'>
                            Adicionar nota
                        </span>
                        <p className='text-slate-400 text-sm leading-6'>
                        Comece  <button className='text-lime-400 hover:underline'>gravando uma nota em áudio</button> ou se preferir <button className='text-lime-400 hover:underline'>utilize apenas texto</button>.
                        </p>
                    </div>

                    <button
                        type='button'
                        className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:underline hover:bg-lime-500'
                    >
                        Salvar Nota
                    </button>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}