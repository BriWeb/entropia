import { Card } from "@/components/ui/card";

export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
            
            <div className="flex justify-between items-center p-4">
                <div className="flex flex-row gap-4">
                    <Card className="w-50 h-50 shadow-md">
                        <h1 className="text-2xl font-bold">Test Card</h1>
                        <p className="text-sm text-gray-500">This is a test card</p>
                    </Card>
                    <Card className="w-50 h-50 shadow-md">
                        <h1 className="text-2xl font-bold"  >Test Card</h1>
                        <p className="text-sm text-gray-500">This is a test card</p>
                    </Card>
                    <Card className="w-50 h-50 shadow-md">
                        <h1 className="text-2xl font-bold">Test Card</h1>
                        <p className="text-sm text-gray-500">This is a test card</p>
                    </Card>
                    <Card className="w-50 h-50 shadow-md">
                        <h1 className="text-2xl font-bold">Test Card</h1>
                        <p className="text-sm text-gray-500">This is a test card</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}