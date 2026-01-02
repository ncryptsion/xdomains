# XDomains
Website subdomains discovery that leverages 3rd party APIs.

# ⚙️ Installations
## Github
```
git clone https://github.com/ncryptsion/xdomains.git
```

## NpmJS
```
npm install
```

## PNPM
```
pnpm install
```

# 🚀 Usage
```
node index.js <domain> <outputName> <full>
```

| Argument | Description | Example |
| --- | --- | --- |
| domain | The target website domain. | `node index.js example.com <outputName> <full>` |
| outputName | The name of the output file for the results. | `node index.js <domain> output <full>` |
| full | If not empty, it will use all APIs otherwise it will not. | `node index.js <domain> <outputName> true` |

<div align="center">
  <sub>This project is distributed under <a href="/LICENSE"><b>MIT License</b></a></sub>
</div>