import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBar } from "../react";
import styles from "../styles.module.css";

const meta = {
  title: "Designsystem/Loading bar",
  decorators: [
    (Story) => (
      <div
        className={styles.grid}
        data-align="center"
        data-items="100"
        style={{
          width: "max-content",
          border: "1px solid #ccc",
          minWidth: 250,
          minHeight: 20,
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <span className={styles.loadingbar}></span>,
};

export const React: Story = {
  render: () => <LoadingBar />,
};
