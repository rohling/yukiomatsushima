import UploadButton from "@/app/components/UploadButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sql } from "@vercel/postgres";
import { useSearchParams } from "next/navigation";

export const revalidate =0

export default function NewStudent({
    searchParams,
  }: {
    searchParams?: {
      url?: string;  
    };
  }){
    
    const urlImage = searchParams?.url || '';

    async function saveStudent(formData: FormData){
        "use server"
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        await sql`INSERT INTO student (name, email) VALUES(${name}, ${email})`
        console.log("Acessou a função")
    }
    return (
        <div>
            <h1 className=" text-center text-4xl">Cadastrar Student</h1>
            <form>
                <Input type="text" name="name" placeholder="Digite o nome do aluno"/><br/>
                <Input type="text" name="email" placeholder="Digite o email do aluno"/> <br/>
                <br/>
                <UploadButton /> <br/>
                <Button formAction={saveStudent} className="text-white">Salvar</Button>
            </form>
        </div>

    )
}