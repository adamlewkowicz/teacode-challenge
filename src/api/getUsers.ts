export const getUsers = async (): Promise<GetUsersResponse> => {
  const response = await fetch(
    'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json'
  );

  if (!response.ok) {
    throw new Error(
      `An error ocurred while fetching the data - ${response.statusText}.`
    );
  }

  const data = (await response.json()) as GetUsersResponse;
  return data;
};

type GetUsersResponse = User[];

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar?: string;
}
