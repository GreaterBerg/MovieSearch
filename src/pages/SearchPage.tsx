import { SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group"

const SearchPage = () => {
    return (
        <div>
            <InputGroup className="my-4 w-100 mx-[auto] text-[var(--text)]">
                <InputGroupInput
                    autoFocus
                    id="inline-start-input"
                    placeholder="Search..."    
                />
                <InputGroupAddon align="inline-start">
                    <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default SearchPage