import { Heading, Text } from "@ignite-ui/react"
import { Container, Hero, Preview } from "./styles"

import previewImage from "../../assets/image1.png"
import Image from "next/image"
import { ClaimUsenameForm } from "./components/ClaimUsenameForm"

export default function Home() {
  return (
    <Container>
        <Hero>
            <Heading size="4xl">Agendamento Descomplicado</Heading>
            <Text size="lg">
                Conecte seu calendário e permita que as pessoas marquem agendamentos no 
                seu tempo livre.
            </Text>


            <ClaimUsenameForm />
        </Hero>

        <Preview>
            <Image 
                src={previewImage} 
                height={400}
                quality={100}
                priority
                alt="calendario"
            />
        </Preview>
    </Container>
  )
}
