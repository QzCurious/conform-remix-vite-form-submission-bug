/* eslint-disable @typescript-eslint/no-unused-vars */
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  Form,
  useActionData,
} from "@remix-run/react";
import z from "zod";

const schema = z.object({
  nickname: z.string().optional(),
});

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const submission = parseWithZod(formData, { schema });
//   console.log("action called", submission);
//   return submission.reply({ resetForm: true });
// };

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });
  console.log("action called", submission);
  return submission.reply({ resetForm: true });
};

export default function Index() {
  // const lastResult = useActionData<typeof action>();
  const lastResult = useActionData<typeof clientAction>();
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    lastResult,
    // onValidate({ formData }) {
    //   return parseWithZod(formData, { schema });
    // },
    // constraint: getZodConstraint(schema),
  });
  return (
    <div style={{ padding: "2rem" }}>
      <h2>remix form</h2>
      <Form method="POST">
        <input type="text" name="nickname" />
        <button type="submit">Submit</button>
      </Form>

      <hr />

      <h2>remix form with conform</h2>
      <Form method="POST" {...getFormProps(form)}>
        <input {...getInputProps(fields.nickname, { type: "text" })} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
