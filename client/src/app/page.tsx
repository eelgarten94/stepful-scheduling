import styles from "./page.module.css";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome to the Stepful Scheduler!</h1>
        <h2>Please select a user type to get started:</h2>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
          <Link href={'/students'}> <Button size="large" sx={{ color: 'white', border: '1px solid white', width: '160px' }}>Student</Button></Link>
          <Link href={'/coaches'}> <Button size="large" sx={{ color: 'white', border: '1px solid white', width: '160px' }}>Coach</Button></Link>
        </Box>

      </div>
    </main>
  );
}
