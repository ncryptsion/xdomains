(async()=>{
    "use strict";

    // Dependencies
    const chalk = require("chalk").default
    const ky = require("ky").default
    const fs = require("fs")

    // Variables
    const args = process.argv.slice(2)

    // Functions
    const unique = (arr)=>[...new Set(arr)]
    const log = (message)=>{console.log(`${chalk.greenBright("[*]")} ${message}`)}

    // const hostedScan = async(domain)=>{ // Too fucking slow.
    //     const response = await ky.post("https://api.hostedscan.com/discover/domains", {
    //         headers: {
    //             referer: "https://hostedscan.com/",
    //             "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.35/36 Safari/537.36"
    //         },
    //         json: {
    //             target: domain
    //         },
    //         timeout: 99999
    //     }).json()
    //     return response.data.domains
    // }

    const devina = async(domain)=>{
        const response = await ky.post("https://devina.io/api/subdomain-finder", {
            headers: {
                referer: "https://devina.io/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.35/36 Safari/537.36",
                "accept-language": "en-US,en;q=0.8",
                accept: "*/*",
                origin: "https://devina.io",
                priority: "u=1, i",
                "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="134", "Google Chrome";v="134"',
                "sec-fetch-mode": "cors"
            },
            json: {
                host: domain
            }
        }).json()
        return response.data.map((data)=>data.subdomain)
    }

    const merkleMap = async(domain)=>{
        const response = await ky.get(`https://api.merklemap.com/v1-webui/search-noauth?query=${domain}`, {
            headers: {
                referer: "https://merklemap.com/"
            }
        }).json()
        return response.results.map((data)=>data.hostname)
    }

    const sdFinder = async(domain)=>{
        const response = await ky.get(`https://api.subdomainfinder.in/?domain=${domain}`, {
            headers: {
                referer: "https://subdomainfinder.in/"
            }
        }).json()
        return response.data.map((data)=>data.subdomain)
    }

    // Main
    if(!args[0] || !args[1]){
        console.log("usage: node index.js <domain> <outputName>")
        process.exit()
    }

    log("Scanning the domain for subdomains...")
    const dR = await devina(args[0])
    const mMR = await merkleMap(args[0])
    const sFR = await sdFinder(args[0])
    const results = unique([...dR, ...mMR, ...sFR])
    
    if(results.length){
        for( const subdomain of results ) log(subdomain)
        log(`${results.length} subdomains found.`)
        fs.writeFileSync(`${args[1]}.txt`, results.join("\n"), "utf8")
        log(`Results has been saved to ${args[1]}.txt`)
    }else{
        log("No subdomains found.")
    }
})()