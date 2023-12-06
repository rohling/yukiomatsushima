import { Button } from "@/components/ui/button";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const revalidate =0

export default async function ListStudent() {
    async function deleteStudent(formData: FormData){
        "use server"
        const id = formData.get("id") as string;
        await sql`DELETE from student where id=${id}`
        revalidatePath("/admin/student")
    }
    const { rows } = await sql`SELECT * from studente`;
    return (
        <div>
            <h1 className="text-center ">Lista de aluno</h1>

            <table>
                <thead>
                    <tr> <td>Nome do aluno</td> <td>Email</td></tr>
                </thead>
                <tbody>
                    {
                        rows.map((student) => {
                            return (
                                <tr key={student.id}><td>{student.name}</td> <td>{student.email}</td> 
                                <td>
                                    <form >
                                     <input type="text" hidden name="id" value={student.id}/>   
                                    <Button variant= "destructive"
                                     formAction={deleteStudent}>Excluir</Button>
                                    </form>
                                
                                </td> 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}