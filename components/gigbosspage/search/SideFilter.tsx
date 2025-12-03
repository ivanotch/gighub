
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type Filters = {
    status: string[];
    location: string;
    category: string;
};

type SideFilterProps = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function SideFilter({ filters, setFilters }: SideFilterProps) {

    const toggleStatus = (value: string) => {
        setFilters(prev => {
            const exists = prev.status.includes(value)
            return {
                ...prev,
                status: exists
                    ? prev.status.filter(s => s !== value)
                    : [...prev.status, value]
            }
        })
    }

    return (
        <main className="bg-gray-100 rounded-xl w-[85%] py-8 pl-4 pr-6 mr-15">
            <div>
                Selected filter
            </div>
            <div className="space-y-3 mb-7">
                <header className="text-sm font-semibold">Gig status</header>

                <div className="flex items-center space-x-2">
                    <Checkbox onCheckedChange={() => toggleStatus("highest success")} className="h-6 w-6 border-black" id="highest" />
                    <Label htmlFor="highest" className="cursor-pointer">
                        <i className="ri-bookmark-3-line text-blue-600 text-[1.3rem]"></i> <span className="">Highest Job Success</span>
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox onCheckedChange={() => toggleStatus("top rated")} className="h-6 w-6 border-black" id="topRated" />
                    <Label htmlFor="topRated" className="cursor-pointer">
                        <i className="ri-sparkling-fill text-yellow-500 text-[1.3rem]"></i> <span>Top Rated</span>
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox onCheckedChange={() => toggleStatus("most experienced")} className="h-6 w-6 border-black" id="experienced" />
                    <Label htmlFor="experienced" className="cursor-pointer">
                        <i className="ri-arrow-up-double-line text-pink-700 text-[1.3rem]"></i> <span>Most Experienced</span>
                    </Label>
                </div>
            </div>
            <div className="mb-7">
                <header className="text-sm font-semibold mb-2">Location</header>

                <Select
                    onValueChange={(value) =>
                        setFilters(prev => ({ ...prev, location: value }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select city" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60">
                        <SelectItem value="manila">Manila</SelectItem>
                        <SelectItem value="quezon-city">Quezon City</SelectItem>
                        <SelectItem value="makati">Makati</SelectItem>
                        <SelectItem value="pasig">Pasig</SelectItem>
                        <SelectItem value="taguig">Taguig</SelectItem>
                        <SelectItem value="mandaluyong">Mandaluyong</SelectItem>
                        <SelectItem value="paranaque">Parañaque</SelectItem>
                        <SelectItem value="las-pinas">Las Piñas</SelectItem>
                        <SelectItem value="caloocan">Caloocan</SelectItem>
                        <SelectItem value="valenzuela">Valenzuela</SelectItem>
                        <SelectItem value="marikina">Marikina</SelectItem>
                        <SelectItem value="antipolo">Antipolo</SelectItem>
                        <SelectItem value="san-juan">San Juan</SelectItem>
                        <SelectItem value="muntinlupa">Muntinlupa</SelectItem>
                        <SelectItem value="cebu-city">Cebu City</SelectItem>
                        <SelectItem value="mandaue">Mandaue</SelectItem>
                        <SelectItem value="lapu-lapu">Lapu-Lapu</SelectItem>
                        <SelectItem value="davao-city">Davao City</SelectItem>
                        <SelectItem value="iloilo-city">Iloilo City</SelectItem>
                        <SelectItem value="bacolod">Bacolod</SelectItem>
                        <SelectItem value="general-santos">General Santos</SelectItem>
                        <SelectItem value="cagayan-de-oro">Cagayan de Oro</SelectItem>
                        <SelectItem value="zamboanga-city">Zamboanga City</SelectItem>
                        <SelectItem value="baguio">Baguio</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <header className="text-sm font-semibold mb-2">Gig Category</header>

                <Select onValueChange={(value) =>
                    setFilters(prev => ({ ...prev, category: value }))
                }>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gig Category" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60">
                        <SelectItem value="e-commerce">E-commerce</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </main>
    )
}