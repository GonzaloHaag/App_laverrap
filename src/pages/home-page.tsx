import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth";

export function HomePage() {
    const logout = async() => {
        await logoutUser();
    }
    return (
        <Button onClick={logout}>
            Logout
        </Button>
    )
}