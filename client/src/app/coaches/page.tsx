import { CoachesView } from "@/Components/CoachesView";
import { fetchCoachesList } from "@/utils/fetch";

export default async function Coaches() {

  const coaches = await fetchCoachesList()

  return (
    <><CoachesView coaches={coaches} /></>)
}