const fromatDate = (dateString) => {
    if(!dateString) return null
    const option = {year: "numeric", month: "long", day:"numeric"}
    const date = new Date(dateString)

    const fromattedDate = date.toLocaleDateString("en-US",option).padStart(2,"0")
    // console.log(fromattedDate)
    return `${fromattedDate}`
}

export {fromatDate}