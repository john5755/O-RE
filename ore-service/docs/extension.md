# 🛠 기능 확장을 위한 상세가이드

현재 O:RE의 페이지 생성에는 `텍스트`, `날짜`, `입력`, `테이블`, `체크박스`, `단일 선택` 이 존재합니다.

추가적인 기능을 원하신다면 아래의 절차에 따라 직접 커스텀이 가능합니다!

## 1️⃣ `TAG_LIST` 객체 추가

> 경로 : S07P31A504/client/renderer/constants.ts

`TAG_LIST` 객체에는 저희가 사용하는 `TAG`의 초기값이 들어있습니다.

```
- type: type명
- name: 실제 앱에 보여질 이름
- tagProps: 커스텀 가능한 값들
  - type: 예) input type='radio button'
  - header: 헤더 내용
  - style: style
```

!!! info "추가로 필요한 값이 있다면 `type`을 추가해줘야합니다."

    경로 : S07P31A504/client/renderer/types.ts/TagPropsType

??? example "TAG_LIST checkbox 예시"

    ``` javascript
    {
      type: "check box",
      name: "체크박스",
      tagProps: {
        type: "checkbox",
        header: "체크박스 버튼 제목",
        label: ["보기1", "보기2", "보기3"],
        style: { width: "", height: "" },
      },
    },
    ```

---

## 2️⃣ 컴포넌트 추가

> 경로 : S07P31A504/client/molecule/TagComponent

본인이 원하는 컴포넌트명.tsx로 컴포넌트를 추가합니다.

```
- 컴포넌트에는 header를 볼 수 있어야 합니다.
- input값을 입력 받을 수 있어야 합니다.
- 입력된 input값을 setUserInput을 통해 입력 받을 수 있어야 합니다.
  -userInput은 object list로 이루어져있음을 주의하여 수정이 필요합니다.
  -header는 중복될 수 없습니다.
```

??? example "check box에서 유저의 클릭을 저장하는 방법"

    ``` javascript
    //타입가드
    if (!header || !setUserInput || !userInput) return;
      //userInput에 현재 헤더가 없을시엔 header를 생성해줍니다.
    	  if (!userInput[header]) {
        setUserInput((pre: InputType) => {
          return { ...pre, [header!]: [] };
        });
      }
    	  // user가 check했을 때는 추가해줍니다.
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
    	  // user가 check를 해제했을 때는 제거해줍니다.
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

## 3️⃣ 2번에서 제작한 Component 추가하기

> 경로 : S07P31A504/client/renderer/molecule/CustomPage.tsx

이 곳에서는 우리가 드래그 앤 드롭으로 page를 만들 때 보이는 영역입니다.

Component 객체에 `[key : type] : FunctionComponent`(2번에서 추가한 Component) 추가하기

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
  "1번에서 만든 타입" : 2번컴포넌트,
};
```

## 4️⃣ 페이지 생성 후 보일 수 있게하기

> 경로 : S07P31A504/client/pages/view-page.tsx

이 곳에서는 우리가 만든 페이지가 사용자에게 보이는 영역입니다.

Component 객체에 `key[type] : FunctionComponent`(2번에서 추가한 Component) 추가하기

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
  "1번에서 만든 타입" : 2번컴포넌트,
};
```

!!! Success "여기까지 완료하셨다면 이제 우리가 만든 컴포넌트에 click event가 발생했을 때 수정할 수 있는 기능을 만들어야합니다."

---

## 5️⃣ 2번에서 제작한 컴포넌트를 커스텀할 수 있는 컴포넌트 만들기

> 경로 : S07P31A504/client/template/TagCustomComponent

이 곳에서는 저희가 1번에서 만들었던 기본 object를 사용자가 원하는 모양으로 커스텀 할 수 있는 기능을 제공할 수 있습니다.

현재 저희 버전에서 수정 가능한 목록입니다.

```
- text: 헤더 내용
- check box: 헤더 내용, 옵션 개수 및 옵션 내용
- radio button: 헤더 내용, 옵션 개수 및 옵션 내용
- date picker: 헤더 내용
- table: 헤더 내용, 원하는 column 선택
```

??? example "checkbox를 커스텀하는 컴포넌트입니다."

    ☛ CustomCheckBox.tsx

      - Checkbox는 `하나의 헤더`와 `3개의 옵션`이 `default`입니다.
      - 헤더의 수정이 가능합니다.
      - 옵션의 개수를 늘리거나 줄일 수 있습니다.
      - 옵션에 할당된 값을 수정할 수 있습니다.
        - `option` 관련 컴포넌트 : ListOption.tsx
      - handleChange = header 내용을 수정하는 함수입니다.
        - `header` 관련 컴포넌트 : InputWithLabel.tsx

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
              text="라벨"
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

    ☛ InputWithLabel.tsx
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

    ☛ ListOption.tsx

      - `+`, `-` 버튼을 통해 옵션 개수를 늘리거나 줄일 수 있습니다.
      - `label` 개수만큼 `option` 값을 설정할 수 있습니다.

    ``` javascript
    export default function ListOption({ obj, setObj, objIdx }: CustomType) {
      const [labelCnt, setLabelCnt] = useState<number>(
        obj[objIdx].tagProps.label?.length as number
      );

      return (
        <>
          <ButtonContainer>
            <Label>보기</Label>
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
                  <Label>보기{idx + 1}</Label>
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

## 6️⃣ 5번에서 제작한 커스텀 컴포넌트 추가하기

> 경로 : S07P31A504/client/molecule/CustomTag.tsx

Component 객체에 `[key: type] : CustomComponent`를 추가합니다.

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
  "1번에서 제작한 type명" : 5번커스텀컴포넌트,
};
```

---

저희 `마지막잎새`팀도 주기적으로 기능 추가에 힘쓰도록 노력하겠습니다 🙇🏻
