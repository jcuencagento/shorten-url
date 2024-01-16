
import React from 'react';

import '../styles/Preview.css';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast"
import { useToast } from "./ui/use-toast"
import { Input } from "./ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form"

const formSchema = zod.object({
    url: zod.string().min(10, {
        message: "URL must be at least 10 characters.",
    })
})

let shorten_url;
function Preview() {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: ""
        }
    })

    function onSubmit(value) {
        console.log('Value', value);
        shorten_url = value.url;
        console.log('Shorten URL', shorten_url);
        toast({
            title: "URL has been created!",
            description: `Your shortened URL is: ${shorten_url}.`,
            action: <ToastAction 
                        altText="Go to Dashboard!"
                        onClick={() => {window.location.href = '/dashboard'}}>
                        Go to Dashboard!
                    </ToastAction>,
            options: { size: 'large' }
        })
        form.reset();
    };

    return (
        <div className="preview_body">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-lg items-center space-x-4">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem style={{ width: '80vh' }}>
                                <FormControl>
                                    <Input placeholder="Introduce URL" className={'bg-background max-w-md'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Button variant="secondary" type="submit">
                        <PaperPlaneIcon className="h-4 w-6" />
                    </Button>
                </form>
            </Form>
            <div className="examples">
                <Button variant="secondary">

                </Button>
            </div>
        </div>
    )
};

export default Preview;