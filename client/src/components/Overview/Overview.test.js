import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";
import Overview from "./Overview";
import fixtures from "./fixtures.json";
import { SharedContext } from "../../contexts/SharedContext";
import ImageGallery from "./ImageGallery";
import Selectors from "./Selectors";

const server = setupServer(
  rest.get(`/products/48432`, (req, res, ctx) => {
    return res(ctx.json(fixtures.product));
  }),
  rest.get(`/products/48432/styles`, (req, res, ctx) => {
    return res(ctx.json(fixtures.styles));
  })
);

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <NameContext.Provider {...providerProps}>{ui}</NameContext.Provider>,
    renderOptions
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Overview", () => {
  test("renders overview component with link to Reviews", async () => {
    render(<Overview />);
    const linkElement = await screen.findByRole("link", {
      name: /Read all Reviews/i,
    });
    expect(linkElement).toBeInTheDocument();
  });
});

describe("ImageGallery", () => {
  const photos = [
    "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
    "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
    "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  ];

  test("should render with initial background image ", async () => {
    render(<ImageGallery photos={photos} />);
    const gallery = await document.querySelector("#Gallery");
    expect(gallery).toBeInTheDocument();
    expect(gallery).toHaveStyle(`background-image: url(${photos[0]})`);
  });

  test("should render with right carousel arrow", async () => {
    render(<ImageGallery photos={photos} />);
    const arrow = await screen.findByText(/→/i);
    expect(arrow).toBeInTheDocument();
  });

  test("should change background image on right arrow click", async () => {
    render(<ImageGallery photos={photos} />);
    const arrow = await screen.findByText(/→/i);

    const gallery = await document.querySelector("#Gallery");
    expect(gallery).toHaveStyle(`background-image: url(${photos[0]})`);

    fireEvent.click(arrow);

    expect(gallery).toHaveStyle(`background-image: url(${photos[1]})`);
  });

  test("left arrow should appear after click on right arrow", async () => {
    render(<ImageGallery photos={photos} />);
    const rightarrow = await screen.findByText(/→/i);
    const gallery = await document.querySelector("#Gallery");
    expect(gallery).toHaveStyle(`background-image: url(${photos[0]})`);

    fireEvent.click(rightarrow);

    const leftarrow = screen.getByText(/←/i);
    expect(leftarrow).toBeInTheDocument();
  });
  test("left arrow click should decrement photo", async () => {
    render(<ImageGallery photos={photos} />);
    const rightarrow = await screen.findByText(/→/i);
    const gallery = await document.querySelector("#Gallery");
    expect(gallery).toHaveStyle(`background-image: url(${photos[0]})`);

    fireEvent.click(rightarrow);
    expect(gallery).toHaveStyle(`background-image: url(${photos[1]})`);
    const leftarrow = screen.getByText(/←/i);

    fireEvent.click(leftarrow);
    expect(gallery).toHaveStyle(`background-image: url(${photos[0]})`);
  });
});

describe("Selectors", () => {
  const thumbnails = [
    "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
  ];

  const currStyle = 0;
  const setCurrStyle = () => "Set Curr Style";

  const style = {
    style_id: 293480,
    name: "Forest Green & Black",
    original_price: "140.00",
    sale_price: null,
    "default?": true,
    photos: [
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      },
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
      },
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
      },
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      },
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      },
      {
        thumbnail_url:
          "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        url: "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    skus: {
      1702764: { quantity: 8, size: "XS" },
      1702765: { quantity: 16, size: "S" },
      1702766: { quantity: 17, size: "M" },
      1702767: { quantity: 10, size: "L" },
      1702768: { quantity: 15, size: "XL" },
      1702769: { quantity: 4, size: "XL" },
    },
  };

  test("should render to document", async () => {
    render(
      <Selectors
        thumbnails={thumbnails}
        setCurrStyle={setCurrStyle}
        style={style}
        currStyle={currStyle}
      />
    );

    const selectors = document.querySelector("#Selectors");
    expect(selectors).toBeInTheDocument();
  });
});
