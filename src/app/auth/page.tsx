import Login from "@/components/forms/auth/Login";
import Register from "@/components/forms/auth/Register";

export default function page(
  {
    searchParams
  }: {
    searchParams: {
      mode: string
    }
  }
) {
  const mode = searchParams.mode || 'login'
  console.log(mode)

  return (
    <section>
        {
          mode === 'login' ? <Login /> : <Register />
        }
    </section>
  )
}
