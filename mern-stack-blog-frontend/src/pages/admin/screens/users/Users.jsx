import React from "react";
import { images } from "../../../../constants";
import { users } from "../../../../constants/dataMock";
import DataTable from "../../components/DataTable";

const Users = () => {
  // const {
  //   userState,
  //   currentPage,
  //   searchKeyword,
  //   data: usersData,
  //   isLoading,
  //   isFetching,
  //   isLoadingDeleteData,
  //   queryClient,
  //   searchKeywordHandler,
  //   submitSearchKeywordHandler,
  //   deleteDataHandler,
  //   setCurrentPage,
  // } = useDataTable({
  //   dataQueryFn: () =>
  //     getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
  //   dataQueryKey: "users",
  //   deleteDataMessage: "User is deleted",
  //   mutateDeleteFn: ({ slug, token }) => {
  //     return deleteUser({
  //       slug,
  //       token,
  //     });
  //   },
  // });

  // const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
  //   useMutation({
  //     mutationFn: ({ isAdmin, userId }) => {
  //       return updateProfile({
  //         token: userState.userInfo.token,
  //         userData: { admin: isAdmin },
  //         userId,
  //       });
  //     },
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries(["users"]);
  //       toast.success("User is updated");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //       console.log(error);
  //     },
  //   });

  // const handleAdminCheck = (event, userId) => {
  //   const initialCheckValue = !event.target.checked;

  //   if (
  //     window.confirm("Do you want to change the admin status of this user?")
  //   ) {
  //     mutateUpdateUser({ isAdmin: event.target.checked, userId });
  //   } else {
  //     event.target.checked = initialCheckValue;
  //   }
  // };

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      // searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      // searchKeywordOnChangeHandler={searchKeywordHandler}
      // searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "Total Post",
        "is Editor",
        "is Author",
        "",
      ]}
      // isLoading={isLoading}
      // isFetching={isFetching}
      data={users}
      // setCurrentPage={setCurrentPage}
      // currentPage={currentPage}
      // headers={usersData?.headers}
      // userState={userState}
    >
      {users.map((user) => (
        <tr key={user._id}>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={images.userImage}
                    alt={user.name}
                    className="mx-auto aspect-square w-10 rounded-lg object-cover"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
              </div>
            </div>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">{user.email}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">{user.createdAt}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">{user.totalPost}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <input
              type="checkbox"
              className="d-checkbox bg-cover checked:bg-[url('../public/images/check.png')] disabled:bg-orange-400 disabled:opacity-100 checked:disabled:bg-none"
              defaultChecked={user.isEditor}
              // onChange={(event) => handleAdminCheck(event, user._id)}
              // disabled={isLoadingUpdateUser}
            />
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <input
              type="checkbox"
              className="d-checkbox bg-cover checked:bg-[url('../public/images/check.png')] disabled:bg-orange-400 disabled:opacity-100 checked:disabled:bg-none"
              defaultChecked={user.isAuthor}
              // onChange={(event) => handleAdminCheck(event, user._id)}
              // disabled={isLoadingUpdateUser}
            />
          </td>
          <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <button
              // disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-70"
              // onClick={() => {
              //   deleteDataHandler({
              //     slug: user?._id,
              //     token: userState.userInfo.token,
              //   });
              // }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
