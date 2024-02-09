export function NoteCard() {
    return (
        
        <button className='rounded-md text-left bg-slate-800 p-5 space-y-3 hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400 outline-none relative overflow-hidden'>
            <span className='text-slate-300 text-sm font-medium'>
                há 2 dias
            </span>
            <p className='text-slate-400 text-sm leading-6'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempora sed sit laudantium praesentium, ut fugit. Odio quam minus facere iure quibusdam! Nemo, atque. Sit deleniti fugiat voluptates dolor doloribus!
            </p>

            <div className=' absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0' />
        </button>

    )
}