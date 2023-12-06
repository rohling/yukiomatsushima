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
    const { rows } = await sql`SELECT * from student`;
    return (
        <div>
	@@ -16,7 +23,15 @@ export default async function ListStudent() {
                    {
                        rows.map((student) => {
                            return (
                                <tr key={student.id}><td>{student.name}</td> <td>{student.email}</td> 
                                <td>
                                    <form >
                                     <input type="text" hidden name="id" value={student.id}/>   
                                    <button formAction={deleteStudent}>Excluir</button>
                                    </form>

                                </td> 
                                </tr>
                            )
                        })
                    }