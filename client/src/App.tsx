import { Providers } from "@/providers";
import router from "@/routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
