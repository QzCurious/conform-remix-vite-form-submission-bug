/* eslint-disable @typescript-eslint/no-unused-vars */
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  Form,
  useActionData,
  useFetcher,
} from "@remix-run/react";
import z from "zod";

const schema = z.object({
  nickname: z.string().optional(),
});

// export const action = async ({ request }: ActionFunctionArgs) => {
export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });
  console.log("action called", submission);
  return submission.reply({ resetForm: true });
};

export default function Index() {
  return (
    <div style={{ padding: "2rem" }}>
      {/* <RemixForm /> */}

      {/* <RemixFetcherFormWithConform /> */}

      <RemixFormWithConform />
    </div>
  );
}

function RemixForm() {
  return (
    <section>
      <h2>
        remix <code>{"<Form/>"}</code>
      </h2>
      <Form method="POST">
        <input type="text" name="nickname" />
        <button type="submit">Submit</button>
      </Form>
    </section>
  );
}

function RemixFetcherFormWithConform() {
  const fetcher = useFetcher<typeof clientAction>();
  const lastResult = fetcher.data;
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    lastResult,
  });

  return (
    <section>
      <h2>
        remix <code>{"<fetcher.Form/>"}</code> with conform
      </h2>
      <fetcher.Form method="POST" {...getFormProps(form)}>
        <input {...getInputProps(fields.nickname, { type: "text" })} />
        <button type="submit">Submit</button>
      </fetcher.Form>
      <p>input text get cleared on blur is expected</p>
    </section>
  );
}

function RemixFormWithConform() {
  // const lastResult = useActionData<typeof action>();
  const lastResult = useActionData<typeof clientAction>();
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    lastResult,
  });

  return (
    <section>
      <h2>
        remix <code>{"<Form/>"}</code> with conform
      </h2>
      <Form method="POST" {...getFormProps(form)}>
        <input {...getInputProps(fields.nickname, { type: "text" })} />
        <button type="submit">Submit</button>
      </Form>
      <p>input text get cleared on blur is expected</p>
    </section>
  );
}
