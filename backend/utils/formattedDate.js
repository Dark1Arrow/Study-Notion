const formattedDate = (date) =>{ 
    return new Date(date).toLocaleDateString("en-Us",{
        month: "long",
        day : "numeric",
        year : "numeric",
    })
}

export default formattedDate