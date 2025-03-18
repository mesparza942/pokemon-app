import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the main section", async () => {
    render(<Home />);
    const mainElement = await screen.findByText("This is the main section");
    expect(mainElement).toMatchInlineSnapshot(`
<main
  class="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"
>
  This is the main section
</main>
`);
  });
});
