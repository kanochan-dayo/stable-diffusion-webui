const LORA_REGEX = /<(?!e:|h:)[^,> ]*>?/g;
const LORA_TRIGGER = () => CFG.useLoras && tagword.match(LORA_REGEX);

class LoraParser extends BaseTagParser {
    parse() {
        // Show lora
        let tempResults = [];
        if (tagword !== "<" && tagword !== "<l:") {
            let searchTerm = tagword.replace("<l:", "").replace("<", "");
            tempResults = loras.filter(x => x.toLowerCase().includes(searchTerm)); // Filter by tagword
        } else {
            tempResults = loras;
        }

        // Add final results
        let finalResults = [];
        tempResults.forEach(t => {
            let result = new AutocompleteResult(t.trim(), ResultType.lora)
            result.meta = "Lora";
            finalResults.push(result);
        });

        return finalResults;
    }
}

async function load() {
    if (loras.length === 0) {
        try {
            loras = (await readFile(`${tagBasePath}/temp/lora.txt`)).split("\n")
                .filter(x => x.trim().length > 0) // Remove empty lines
                .map(x => x.trim()); // Remove carriage returns and padding if it exists
        } catch (e) {
            console.error("Error loading lora.txt: " + e);
        }
    }
}

function sanitize(tagType, text) {
    if (tagType === ResultType.lora) {
        return `<lora:${text}:${CFG.extraNetworksDefaultMultiplier}>`;
    }
    return null;
}

PARSERS.push(new LoraParser(LORA_TRIGGER));

// Add our utility functions to their respective queues
QUEUE_FILE_LOAD.push(load);
QUEUE_SANITIZE.push(sanitize);