import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "../../services/CookiesService";

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (buidler) => ({
    getDashboardProducts: buidler.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `?populate=categories&populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Products",
                id,
              })),
              {
                type: "Products",
                id: "LIST",
              },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    deleteDashboardProducts: buidler.mutation({
      query(id: string | null) {
        return {
          url: `/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookiesService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    UpdateDashboardProducts: buidler.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookiesService.get("jwt")}`, // Only authorization
        },
        body: body, // Send the FormData object as the body
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    CreateDashboardProducts: buidler.mutation({
      query: ({ body }) => ({
        url: ``,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookiesService.get("jwt")}`, // Only authorization
        },
        body: body, // Send the FormData object as the body
      }),
      async onQueryStarted({ _, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            _,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});
export default productsApiSlice.reducer;
export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useCreateDashboardProductsMutation
} = productsApiSlice;
