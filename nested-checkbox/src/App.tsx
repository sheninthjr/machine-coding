import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[]
}

const checkedData:TreeNode[] = [
  {
    id: 1,
    name: "Watermelon",
    children: [
      {
        id: 2,
        name: "Grapes",
        children: [
          {
            id: 3,
            name: "Orange",
          },
          {
            id: 4,
            name: "Lemon",
          },
        ],
      },
      {
        id: 5,
        name: "Strawberry",
        children: [
          {
            id: 6,
            name: "Berries",
          },
          {
            id: 7,
            name: "Blueberry",
          },
        ],
      },
    ],
  },
];

type CheckedState = Record<number, boolean>;
type SetCheckedState = React.Dispatch<React.SetStateAction<CheckedState>>;

interface CheckBoxesProps {
  data: TreeNode[];
  isChecked: CheckedState;
  setIsChecked: SetCheckedState;
}


const CheckBoxes = ({ data, isChecked, setIsChecked }: CheckBoxesProps) => {
  const handleOnChange = (checked:boolean, node:TreeNode) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [node.id]: checked };
      const updateChildren = (node:TreeNode) => {
        node.children?.forEach((child) => {
          newState[child.id] = checked;
          node.children && updateChildren(child);
        });
      };
      updateChildren(node);

      const verifyChecked = (node:TreeNode): boolean => {

        if(!node.children) return newState[node.id] || false
        
        const allChildrenChecked = node.children.every(
          (child) => verifyChecked(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked
      };
     
      checkedData.forEach((node) => verifyChecked(node));

      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div className="parent" key={node.id}>
          <input
            type="checkbox"
            checked={isChecked[node.id] || false}
            onChange={(e) => handleOnChange(e.target.checked, node)}
          />
          <span>{node.name}</span>
          {node.children && (
            <CheckBoxes
              data={node.children}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [isChecked, setIsChecked] = useState<Record<number,boolean>>({});

  return (
    <CheckBoxes
      data={checkedData}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
    />
  );
}

export default App;
