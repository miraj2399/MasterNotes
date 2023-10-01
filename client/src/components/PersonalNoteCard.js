import  Markdown  from 'react-markdown'


export default function PersonalNoteCard(props) {
    const {content, createdAt} = props.note
    return (
        <div className="border border-red-100 border-1 p-4 m-2 hover:scale-105">
            <p className="text-gray-500 text-sm">{new  Date(createdAt).toDateString()}</p>
            <div className='prose  p-5 border border-gray-300 outline-none '>
                <Markdown className="">{
                    content.length>200?content.slice(0,200)+"...":content
                }</Markdown>
            </div>
        </div>
    )
}
