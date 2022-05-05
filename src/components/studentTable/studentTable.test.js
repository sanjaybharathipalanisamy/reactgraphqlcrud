import { render, screen, fireEvent } from "@testing-library/react";
import StudentTable from ".";
import { Provider } from "react-redux";
import store from "../../redux/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

it("State is managed correctly", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StudentTable />
      </ApolloProvider>
    </Provider>
  );
  const button = screen.getByTestId("add-new-button");
  fireEvent.click(button);

  const headerElement = screen.getByText(/Add student/i);
  expect(headerElement).toBeInTheDocument();
});
