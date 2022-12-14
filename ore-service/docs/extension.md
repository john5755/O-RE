# ๐  ๊ธฐ๋ฅ ํ์ฅ์ ์ํ ์์ธ๊ฐ์ด๋

ํ์ฌ O:RE์ ํ์ด์ง ์์ฑ์๋ `ํ์คํธ`, `๋ ์ง`, `์๋ ฅ`, `ํ์ด๋ธ`, `์ฒดํฌ๋ฐ์ค`, `๋จ์ผ ์ ํ` ์ด ์กด์ฌํฉ๋๋ค.

์ถ๊ฐ์ ์ธ ๊ธฐ๋ฅ์ ์ํ์ ๋ค๋ฉด ์๋์ ์ ์ฐจ์ ๋ฐ๋ผ ์ง์  ์ปค์คํ์ด ๊ฐ๋ฅํฉ๋๋ค!

## 1๏ธโฃ `TAG_LIST` ๊ฐ์ฒด ์ถ๊ฐ

> ๊ฒฝ๋ก : S07P31A504/client/renderer/constants.ts

`TAG_LIST` ๊ฐ์ฒด์๋ ์ ํฌ๊ฐ ์ฌ์ฉํ๋ `TAG`์ ์ด๊ธฐ๊ฐ์ด ๋ค์ด์์ต๋๋ค.

```
- type: type๋ช
- name: ์ค์  ์ฑ์ ๋ณด์ฌ์ง ์ด๋ฆ
- tagProps: ์ปค์คํ ๊ฐ๋ฅํ ๊ฐ๋ค
  - type: ์) input type='radio button'
  - header: ํค๋ ๋ด์ฉ
  - style: style
```

!!! info "์ถ๊ฐ๋ก ํ์ํ ๊ฐ์ด ์๋ค๋ฉด `type`์ ์ถ๊ฐํด์ค์ผํฉ๋๋ค."

    ๊ฒฝ๋ก : S07P31A504/client/renderer/types.ts/TagPropsType

??? example "TAG_LIST checkbox ์์"

    ``` javascript
    {
      type: "check box",
      name: "์ฒดํฌ๋ฐ์ค",
      tagProps: {
        type: "checkbox",
        header: "์ฒดํฌ๋ฐ์ค ๋ฒํผ ์ ๋ชฉ",
        label: ["๋ณด๊ธฐ1", "๋ณด๊ธฐ2", "๋ณด๊ธฐ3"],
        style: { width: "", height: "" },
      },
    },
    ```

---

## 2๏ธโฃ ์ปดํฌ๋ํธ ์ถ๊ฐ

> ๊ฒฝ๋ก : S07P31A504/client/molecule/TagComponent

๋ณธ์ธ์ด ์ํ๋ ์ปดํฌ๋ํธ๋ช.tsx๋ก ์ปดํฌ๋ํธ๋ฅผ ์ถ๊ฐํฉ๋๋ค.

```
- ์ปดํฌ๋ํธ์๋ header๋ฅผ ๋ณผ ์ ์์ด์ผ ํฉ๋๋ค.
- input๊ฐ์ ์๋ ฅ ๋ฐ์ ์ ์์ด์ผ ํฉ๋๋ค.
- ์๋ ฅ๋ input๊ฐ์ setUserInput์ ํตํด ์๋ ฅ ๋ฐ์ ์ ์์ด์ผ ํฉ๋๋ค.
  -userInput์ object list๋ก ์ด๋ฃจ์ด์ ธ์์์ ์ฃผ์ํ์ฌ ์์ ์ด ํ์ํฉ๋๋ค.
  -header๋ ์ค๋ณต๋  ์ ์์ต๋๋ค.
```

??? example "check box์์ ์ ์ ์ ํด๋ฆญ์ ์ ์ฅํ๋ ๋ฐฉ๋ฒ"

    ``` javascript
    //ํ์๊ฐ๋
    if (!header || !setUserInput || !userInput) return;
      //userInput์ ํ์ฌ ํค๋๊ฐ ์์์์ header๋ฅผ ์์ฑํด์ค๋๋ค.
    	  if (!userInput[header]) {
        setUserInput((pre: InputType) => {
          return { ...pre, [header!]: [] };
        });
      }
    	  // user๊ฐ checkํ์ ๋๋ ์ถ๊ฐํด์ค๋๋ค.
      if (e.target.checked) {
        setUserInput((pre) => {
          const preArr = pre[header];
          return {
            ...pre,
            [header]: Array.isArray(preArr)
              ? [...preArr, e.target.value]
              : preArr,
          };
        });
    	  // user๊ฐ check๋ฅผ ํด์ ํ์ ๋๋ ์ ๊ฑฐํด์ค๋๋ค.
      } else {
        setUserInput((pre) => {
          const preArr = pre[header];
          return {
            ...pre,
            [header]: Array.isArray(preArr)
              ? preArr.filter((v: string) => v !== value)
              : preArr,
          };
        });
    }
    ```

---

## 3๏ธโฃ 2๋ฒ์์ ์ ์ํ Component ์ถ๊ฐํ๊ธฐ

> ๊ฒฝ๋ก : S07P31A504/client/renderer/molecule/CustomPage.tsx

์ด ๊ณณ์์๋ ์ฐ๋ฆฌ๊ฐ ๋๋๊ทธ ์ค ๋๋กญ์ผ๋ก page๋ฅผ ๋ง๋ค ๋ ๋ณด์ด๋ ์์ญ์๋๋ค.

Component ๊ฐ์ฒด์ `[key : type] : FunctionComponent`(2๋ฒ์์ ์ถ๊ฐํ Component) ์ถ๊ฐํ๊ธฐ

```javascript
const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: Text,
  "date picker": DatePicker,
  input: Input,
  table: BasicTable,
  "check box": CheckBox,
  "radio button": RadioButton,
  "1๋ฒ์์ ๋ง๋  ํ์" : 2๋ฒ์ปดํฌ๋ํธ,
};
```

## 4๏ธโฃ ํ์ด์ง ์์ฑ ํ ๋ณด์ผ ์ ์๊ฒํ๊ธฐ

> ๊ฒฝ๋ก : S07P31A504/client/pages/view-page.tsx

์ด ๊ณณ์์๋ ์ฐ๋ฆฌ๊ฐ ๋ง๋  ํ์ด์ง๊ฐ ์ฌ์ฉ์์๊ฒ ๋ณด์ด๋ ์์ญ์๋๋ค.

Component ๊ฐ์ฒด์ `key[type] : FunctionComponent`(2๋ฒ์์ ์ถ๊ฐํ Component) ์ถ๊ฐํ๊ธฐ

```javascript
const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: Text,
  "date picker": DatePicker,
  input: Input,
  table: BasicTable,
  "check box": CheckBox,
  "radio button": RadioButton,
  "1๋ฒ์์ ๋ง๋  ํ์" : 2๋ฒ์ปดํฌ๋ํธ,
};
```

!!! Success "์ฌ๊ธฐ๊น์ง ์๋ฃํ์จ๋ค๋ฉด ์ด์  ์ฐ๋ฆฌ๊ฐ ๋ง๋  ์ปดํฌ๋ํธ์ click event๊ฐ ๋ฐ์ํ์ ๋ ์์ ํ  ์ ์๋ ๊ธฐ๋ฅ์ ๋ง๋ค์ด์ผํฉ๋๋ค."

---

## 5๏ธโฃ 2๋ฒ์์ ์ ์ํ ์ปดํฌ๋ํธ๋ฅผ ์ปค์คํํ  ์ ์๋ ์ปดํฌ๋ํธ ๋ง๋ค๊ธฐ

> ๊ฒฝ๋ก : S07P31A504/client/template/TagCustomComponent

์ด ๊ณณ์์๋ ์ ํฌ๊ฐ 1๋ฒ์์ ๋ง๋ค์๋ ๊ธฐ๋ณธ object๋ฅผ ์ฌ์ฉ์๊ฐ ์ํ๋ ๋ชจ์์ผ๋ก ์ปค์คํ ํ  ์ ์๋ ๊ธฐ๋ฅ์ ์ ๊ณตํ  ์ ์์ต๋๋ค.

ํ์ฌ ์ ํฌ ๋ฒ์ ์์ ์์  ๊ฐ๋ฅํ ๋ชฉ๋ก์๋๋ค.

```
- text: ํค๋ ๋ด์ฉ
- check box: ํค๋ ๋ด์ฉ, ์ต์ ๊ฐ์ ๋ฐ ์ต์ ๋ด์ฉ
- radio button: ํค๋ ๋ด์ฉ, ์ต์ ๊ฐ์ ๋ฐ ์ต์ ๋ด์ฉ
- date picker: ํค๋ ๋ด์ฉ
- table: ํค๋ ๋ด์ฉ, ์ํ๋ column ์ ํ
```

??? example "checkbox๋ฅผ ์ปค์คํํ๋ ์ปดํฌ๋ํธ์๋๋ค."

    โ CustomCheckBox.tsx

      - Checkbox๋ `ํ๋์ ํค๋`์ `3๊ฐ์ ์ต์`์ด `default`์๋๋ค.
      - ํค๋์ ์์ ์ด ๊ฐ๋ฅํฉ๋๋ค.
      - ์ต์์ ๊ฐ์๋ฅผ ๋๋ฆฌ๊ฑฐ๋ ์ค์ผ ์ ์์ต๋๋ค.
      - ์ต์์ ํ ๋น๋ ๊ฐ์ ์์ ํ  ์ ์์ต๋๋ค.
        - `option` ๊ด๋ จ ์ปดํฌ๋ํธ : ListOption.tsx
      - handleChange = header ๋ด์ฉ์ ์์ ํ๋ ํจ์์๋๋ค.
        - `header` ๊ด๋ จ ์ปดํฌ๋ํธ : InputWithLabel.tsx

    ``` javascript
    //CustomCheckBox.tsx
    export default function CustomCheckBox({ obj, setObj, objIdx }: CustomType) {
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setObj((pre: TagType[]) => {
          return [
            ...pre.slice(0, objIdx),
            {
              ...pre[objIdx],
              tagProps: {
                ...pre[objIdx].tagProps,
                header: e.target.value,
              },
            },
            ...pre.slice(objIdx + 1),
          ];
        });
      };
      return (
        <Container>
          <CustomContainer>
            <InputWithLabel
              text="๋ผ๋ฒจ"
              value={obj[objIdx].tagProps.header}
              handleChange={handleChange}
            />
          </CustomContainer>
          <CustomContainer>
            <ListOption obj={obj} setObj={setObj} objIdx={objIdx} />
          </CustomContainer>
        </Container>
      );
    }
    ```

    โ InputWithLabel.tsx
    ``` javascript
    //InputWithLabel.tsx
    export default function InputWithLabel({ text, value, handleChange }: any) {
      return (
        <InputWrapper>
          <Label>{text}</Label>
          <Input value={value} onChange={(e) => handleChange(e)}></Input>
        </InputWrapper>
      );
    }
    ```

    โ ListOption.tsx

      - `+`, `-` ๋ฒํผ์ ํตํด ์ต์ ๊ฐ์๋ฅผ ๋๋ฆฌ๊ฑฐ๋ ์ค์ผ ์ ์์ต๋๋ค.
      - `label` ๊ฐ์๋งํผ `option` ๊ฐ์ ์ค์ ํ  ์ ์์ต๋๋ค.

    ``` javascript
    export default function ListOption({ obj, setObj, objIdx }: CustomType) {
      const [labelCnt, setLabelCnt] = useState<number>(
        obj[objIdx].tagProps.label?.length as number
      );

      return (
        <>
          <ButtonContainer>
            <Label>๋ณด๊ธฐ</Label>
            <OptionButon onClick={() => setLabelCnt((pre) => (pre = pre + 1))}>
              +
            </OptionButon>
            <OptionButon
              onClick={() => {
                setObj((pre: TagType[]) => {
                  return [
                    ...pre.slice(0, objIdx),
                    {
                      ...pre[objIdx],
                      tagProps: {
                        ...pre[objIdx].tagProps,
                        label: [
                          ...pre[objIdx].tagProps.label!.splice(0, labelCnt - 1),
                        ],
                      },
                    },
                    ...pre.slice(objIdx + 1),
                  ];
                });
                setLabelCnt((pre) => (pre = pre - 1));
              }}
            >
              -
            </OptionButon>
          </ButtonContainer>
          {labelCnt > 0 &&
            [...Array(labelCnt)].map((_, idx) => {
              return (
                <InputWrapper key={idx}>
                  <Label>๋ณด๊ธฐ{idx + 1}</Label>
                  <Input
                    type="text"
                    value={obj[objIdx].tagProps.label?.[idx]}
                    onChange={(e) =>
                      setObj((pre: TagType[]) => {
                        return [
                          ...pre.slice(0, objIdx),
                          {
                            ...pre[objIdx],
                            tagProps: {
                              ...pre[objIdx].tagProps,
                              label: [
                                ...pre[objIdx].tagProps.label!.slice(0, idx),
                                e.target.value,
                                ...pre[objIdx].tagProps.label!.slice(idx + 1),
                              ],
                            },
                          },
                          ...pre.slice(objIdx + 1),
                        ];
                      })
                    }
                  ></Input>
                </InputWrapper>
              );
            })}
        </>
      );
    }
    ```

---

## 6๏ธโฃ 5๋ฒ์์ ์ ์ํ ์ปค์คํ ์ปดํฌ๋ํธ ์ถ๊ฐํ๊ธฐ

> ๊ฒฝ๋ก : S07P31A504/client/molecule/CustomTag.tsx

Component ๊ฐ์ฒด์ `[key: type] : CustomComponent`๋ฅผ ์ถ๊ฐํฉ๋๋ค.

```javascript
const Component: {
  [key: string]: React.FunctionComponent<any>;
} = {
  text: CustomText,
  "date picker": CustomDatePicker,
  input: CustomInput,
  table: CustomTable,
  "check box": CustomCheckBox,
  "radio button": CustomRadioButton,
  "1๋ฒ์์ ์ ์ํ type๋ช" : 5๋ฒ์ปค์คํ์ปดํฌ๋ํธ,
};
```

---

์ ํฌ `๋ง์ง๋ง์์`ํ๋ ์ฃผ๊ธฐ์ ์ผ๋ก ๊ธฐ๋ฅ ์ถ๊ฐ์ ํ์ฐ๋๋ก ๋ธ๋ ฅํ๊ฒ ์ต๋๋ค ๐๐ป
