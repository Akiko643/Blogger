import { UserProvider } from "@/provider/userProvider";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
