import { SingIn } from './SingIn'
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor} from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import { rest } from "msw"

export default {
    title: 'Pages/Sing in',
    component: SingIn,
    args: { },
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post('/session', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login realizado'
                    }))
                })
            ]
        }
    }
} as Meta

export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('digite seu e-mail'), 'marcospmc@outlook.com')
        userEvent.type(canvas.getByPlaceholderText('******'), 'teste123')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getByText('Login realizado')).toBeInTheDocument();
        });

    }
}

