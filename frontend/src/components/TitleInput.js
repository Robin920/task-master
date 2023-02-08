
const TitleInput = ({title, setTitle}) => {

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    return(
        <label htmlFor="title">
            <input 
            className="
                text-2xl
                md:text-4xl 
                h-16 
                text-blue-800 
                w-full 
                lg:w-5/6
                pl-2
                pb-1 
                border-t-0 
                border-l-0 
                border-r-0 
                border-b-2 
                border-blue-300 
                focus:border-b-2 
                focus:border-blue-500 
                placeholder-blue-500
                focus:ring-0
            "
            type="text" 
            id="title" 
            name="title" 
            placeholder="Todo Title"
            value={title}
            onChange={handleChange}
            onKeyPress={e => {
                if (e.key === 'Enter') e.preventDefault();
            }} />
        </label>
    )
}


export default TitleInput