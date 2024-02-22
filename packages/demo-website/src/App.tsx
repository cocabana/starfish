
import {Avatar, Button, Chip, Container, Group, rem, Text, TextInput, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import { IconExclamationCircle } from '@tabler/icons-react';
import {starfishAPi} from "@starfish/artifacts";
import {useProfileCard} from "./useProfileCard.ts";

type IdAccount = {
  address: string;
  balance: string;
}

type ProfileCard = {
  stylesheet: string;
  body: string;
  width: number;
  height: number;
}

function App() {

  const [address, setAddress] = useState('');
  //const [balance, setBalance] = useState('');
  const [preselect, setPreSelect] = useState('');
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [profileCard, setProfileCard] = useState<ProfileCard>()
  const [account, setAccount] = useState<IdAccount>(undefined)
  const [accountAddresses, setAccountAccounts] = useState<string[]>([])

  const { fetchProfileCard } = useProfileCard();

  useEffect(() => {
    starfishAPi.getDemoAccounts().then((result) => {
      setAccountAccounts(result);
    })
  }, []);

  const handleInputChanged = async (value: string) => {
    const safeAddress = value.trim();
    setAddress(safeAddress);
    if (!safeAddress) {
      setSubmitError('');
    }
  }

  const handlePreSelect = (value: string) => {
    setPreSelect(value);
    setAddress(value);
    setSubmitError('');
  }

  const handleSubmit = async () => {
    const safeAddress = address.trim();
    setPending(true);
    setPreSelect('');
    if (safeAddress) {
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      starfishAPi.getAccountBalance(safeAddress)
      .then((result) => {
        setAddress('');
        setAccount({ address: safeAddress, balance: result });

        fetchProfileCard(safeAddress)
          .then((profileCard) => {
            setProfileCard(profileCard);
          })
          .catch((error) => {
            console.error('Error', error);
            setProfileCard(undefined);
          })

      })
      .catch((error) => {
        console.error('Error', error);
        setSubmitError('Invalid address');
      })
      .finally(() => setPending(false));
    }
  }


  return (
    <>

      <div className="flex gap-20 items-center m-8 relative">
        <Group>
          <Avatar src="/assets/images/beach-island.jpg" size={78} radius="xl" />
          <div>
            <Title> Cocabana </Title>
            <Text size="xl" c="dimmed">Starfish Identity</Text>
          </div>
        </Group>
        <Text size="xl" c="dimmed">Cocabana Starfish Identity demo</Text>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <div>
          <Group gap={4}>
          <Chip.Group multiple={false} value={preselect} onChange={handlePreSelect} >
            {accountAddresses.map((a,i) => <Chip value={a} variant="outline" key={i}>{`account #${i+1}`}</Chip>)}
          </Chip.Group>
          </Group>
          <Group className="mt-4" align="top">
            <TextInput className="min-w-96"
                placeholder="Enter address"
                onChange={(event) => handleInputChanged(event.currentTarget.value)}
                 error={submitError}
                 value={address}
                 withErrorStyles={false}
                 rightSectionPointerEvents="none"
                 rightSection={ submitError &&
                   <IconExclamationCircle
                     style={{ width: rem(20), height: rem(20) }}
                     color="var(--mantine-color-error)"
                   />
                 }
            />
            <div className="mr-8">
              <Button variant="filled" color="blue" loading={pending} disabled={!address} loaderProps={{ type: 'oval' }} onClick={handleSubmit}>Submit</Button>
            </div>
          </Group>
        </div>
      </div>
      { account && (
          <div className="mt-12 ml-10 flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 ml-4 mt-4">
              <div className="flex justify-between items-end">
                <Text size="xl" fw={700}>Address</Text>
                <Text size="md" c="dimmed">{account.balance}</Text>
              </div>
              <Text size="sm" fw={600} c={"rgb(247,140,20)"}>{account.address}</Text>
            </div>
            <Container p="sm" className="mt-4 rounded-xl w-[650px] h-[450px] flex justify-center items-center">

              {!profileCard && <Text>No profile found</Text>}
              {profileCard && !profileCard.stylesheet && <Text>{profileCard.body}</Text>}
              {profileCard && profileCard.stylesheet && (
                <div className='flex gap-16 flex-wrap items-center'>
                  <style dangerouslySetInnerHTML={{__html: profileCard.stylesheet}}/>
                  <div dangerouslySetInnerHTML={{__html: profileCard.body}} style={{ width: profileCard.width, height: profileCard.height }}/>
                </div>
              )}

            </Container>
          </div>
      )}
    </>
  )
}

export default App
