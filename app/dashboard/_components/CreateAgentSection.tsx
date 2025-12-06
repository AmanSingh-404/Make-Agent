"use client"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { UserDetailContext } from '@/context/UserDeatailsContext'
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner'

function CreateAgentSection() {

    const [OpenDailog, setOpenDialog] = useState(false);
    const CreateAgentMutation = useMutation(api.agent.CreateAgent);
    const [agentName, setAgentName] = useState<string>("");
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const { UserDetail, setUserDetail } = useContext(UserDetailContext);
    const {has}=useAuth();
    const isPaidUser = has&&has({ plan: 'unlimited_plan' })

    const CreateAgent = async () => {
        if(!isPaidUser && UserDetail?.totalRemainingCreadit<=0){
            toast.error("You have no remaining credit");
            return;
        }
        setLoader(true);
        const agentId = uuidv4();//Generate Unique agent id

        if (!UserDetail?._id) {
            console.error("UserDetail or UserDetail._id is missing");
            setLoader(false);
            return;
        }

        try {
            const result = await CreateAgentMutation({
                agentId: agentId,
                name: agentName ?? '',
                userId: UserDetail._id
            });
            console.log("Agent Created:", result);
            setOpenDialog(false);
            setLoader(false);

            //navigation to agent builder page
            router.push('/agent-builder/' + agentId);
        } catch (error) {
            console.error("Error creating agent:", error);
            setLoader(false);
        }
    }

    return (
        <div className='space-y-2 flex flex-col justify-center items-center mt-20'>
            <h2 className='font-bold text-xl'>Create AI Agent</h2>
            <p className='text-lg'>Build a AI Agent Workflow With Custom Logic and Tools</p>

            <Dialog open={OpenDailog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button size={'lg'} onClick={() => setOpenDialog(true)}><Plus />Create</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Agent Name</DialogTitle>
                        <DialogDescription>
                            <Input placeholder='Agent Name' className='mt-4 mb-4' onChange={(event) => setAgentName(event.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'ghost'}>Cancel</Button>
                        </DialogClose>

                        <Button onClick={() => CreateAgent()} disabled={loader}>
                            {loader && <Loader2Icon className='animate-spin' />}Create Agent</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>

    )
}

export default CreateAgentSection