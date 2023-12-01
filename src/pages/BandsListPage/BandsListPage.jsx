import { checkToken } from "../../utilities/users-service";


export default function BandListPage() {



async function handleCheckToken() {
  const expDate = await checkToken()
  console.log(expDate)
}

  return (
    <>
    <h1>Band List Page</h1>
   
    </>
  );
}