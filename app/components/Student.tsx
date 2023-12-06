import { sql } from "@vercel/postgres";

export default async function Student() {

    const { rows } = await sql`SELECT * from Student`;
    console.log(rows)
    return (
        <main className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-3 mt-4 text-white text-center">
                <h2 id="student">
                    CONHEÇA NOSSOS <span>ALUNOS</span>
                </h2>
            </div>
            {
                rows.map((student) => {
                    return (
                        <div key={student.id} className="bg-[#4d4d4d] rounded-md pb-2">
                                <div className="text-white text-center">
                                    <h3>{student.name}L</h3>
                                    <p>{student.email}</p>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
        </main>
  )
}