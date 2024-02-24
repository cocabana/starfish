
import {Avatar, Button, Chip, Container, Group, rem, Text, TextInput, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import { IconExclamationCircle } from '@tabler/icons-react';
import {setNodeProviderUrl, starfishAPi} from "@starfish/artifacts";
import {useProfileCard} from "./useProfileCard.ts";
import accounts from './accounts.json';


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

const nodeUrl = import.meta.env.VITE_NODE_PROVIDER_URL;

if (nodeUrl) {
  setNodeProviderUrl(nodeUrl);
}

function App() {

  const [address, setAddress] = useState('');
  const [preselect, setPreSelect] = useState('');
  const [network, setNetwork] = useState('devnet');
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [profileCard, setProfileCard] = useState<ProfileCard>()
  const [account, setAccount] = useState<IdAccount>(undefined)
  const [accountAddresses, setAccountAddresses] = useState<string[]>(accounts)

  const { fetchProfileCard, getDemoAccounts } = useProfileCard();

  useEffect(() => {
    if (nodeUrl.includes('mainnet')) {
      setAccountAddresses(getDemoAccounts());
      setNetwork('mainnet');
    }
    else if (nodeUrl.includes('testnet')) {
      setAccountAddresses(getDemoAccounts());
      setNetwork('testnet');
    }
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
          .finally(() => setPending(false));

      })
      .catch((error) => {
        console.error('Error', error);
        setSubmitError('Invalid address');
        setPending(false)
      })
    }
  }

  return (
    <>
      <div className="flex gap-20 items-center p-8 relative justify-between">
        <Group>
          {/*<Avatar src="/assets/images/beach-island.jpg" size={78} radius="xl" />*/}
          <div>
            {/*<Title> Cocabana </Title>*/}
            <Text size="xl" c="dimmed">Starfish Identity Demo</Text>
          </div>
        </Group>
        {/*<Text size="xl" c="dimmed">Cocabana Starfish Identity demo</Text>*/}
        <Text size="lg" tt="lowercase" c={"rgb(247,140,20,0.7)"}>[ {network} ]</Text>
      </div>
      <div className="mt-20 flex flex-col items-center">
        <div>
          <Group gap={4}>
          <Chip.Group multiple={false} value={preselect} onChange={handlePreSelect} >
            {accountAddresses.map((a,i) => <Chip value={a} color={"rgb(247,140,20)"} variant="outline" key={i}>{`account #${i+1}`}</Chip>)}
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
              <Button variant="filled" color={"rgb(247,140,20)"} loading={pending} disabled={!address} loaderProps={{ type: 'oval' }} onClick={handleSubmit}>Submit</Button>
            </div>
          </Group>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-0 items-center">
        {/*<div className="flex flex-col gap-2 mt-4">*/}
        {/*  <div className="flex justify-between items-end">*/}
        {/*    <Text size="xl" fw={700}>Address</Text>*/}
        {/*    <Text size="md" c="dimmed">{account.balance}</Text>*/}
        {/*  </div>*/}
        {/*  <Text size="sm" fw={600} c={"rgb(247,140,20)"}>{account.address}</Text>*/}
        {/*</div>*/}
        <Container className="h-[450px] flex justify-center items-center">

          { pending && (<Button variant="outline" mt={4} loading={true} loaderProps={{ type: 'dots' }} color={"rgb(247,140,20)"}>... ...</Button>)}
          {!pending && !profileCard && account && <Text>No profile found</Text>}
          {!pending && profileCard && !profileCard.stylesheet && <Text>{profileCard.body}</Text>}
          {!pending && profileCard && profileCard.stylesheet && (
            <div className='flex gap-16 flex-wrap items-center'>
              <style dangerouslySetInnerHTML={{__html: profileCard.stylesheet}}/>
              <div dangerouslySetInnerHTML={{__html: profileCard.body}} style={{ width: profileCard.width, height: profileCard.height }}/>
            </div>
          )}


        </Container>
        <Text size="sm" c="dimmed">{account?.address}</Text>
      </div>
    </>
  )
}

export default App
