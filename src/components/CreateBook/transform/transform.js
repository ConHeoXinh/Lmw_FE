export const transformDetailData = (data) => ({
  ...data,
  authors: data?.authors?.map?.((el) => el?.id),
  publisher: data?.publisher?.id,
  departments: data?.departments?.map?.((el) => el?.id),
});

export const transformInitData = (data) => {
  return data?.map?.((el) => ({
    ...el,
    label: el?.name,
    value: el?.id,
  }));
};
