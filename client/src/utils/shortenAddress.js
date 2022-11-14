export const shortenAddress = (address) => {
    if (!address) return null
    if (address.length <= 10) return address
    return `${address.slice(0, 7)}...${address.slice(-4)}`
    }