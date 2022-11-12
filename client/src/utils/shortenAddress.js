export const shortenAddress = (address) => {
    if (!address) return null
    if (address.length <= 10) return address
    return `${address.slice(0, 5)}...${address.slice(-4)}`
    }