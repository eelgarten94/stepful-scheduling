
import PageProvider from "@/Components/PageProvider";
import { StudentsView } from "@/Components/StudentsView";
import { fetchStudentsList } from "@/utils/fetch";

export default async function Students() {
  const students = await fetchStudentsList()

  return <>
    <PageProvider><StudentsView students={students} /></PageProvider>
  </>
}