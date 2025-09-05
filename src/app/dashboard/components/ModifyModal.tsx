"use client";

import Chip from "@/components/chip/Chip";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import ImgUpload from "@/components/form/ImgUpload";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const stateOpt = [
  { value: "1", label: "To Do", chip: <Chip variant="status" label="To Do" /> },
  { value: "2", label: "On Progress", chip: <Chip variant="status" label="On Progress" /> },
  { value: "3", label: "Done", chip: <Chip variant="status" label="Done" /> },
];
const managerOpt = [{ value: "1", label: "사람1" }];

export default function ModifyModal({ isOpen, setIsOpen }: ModalType) {
  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title="할 일 수정" />
          <ModalContext className="flex flex-col gap-7">
            <div className="grid grid-cols-2 gap-8">
              <Field id="manager" label="상태">
                <Select options={stateOpt} placeholder="선택하기" labelNone={true} />
              </Field>
              <Field id="manager" label="담당자">
                <Select options={managerOpt} placeholder="선택하기" />
              </Field>
            </div>
            <Field id="title" label="제목">
              <Input />
            </Field>
            <Field id="description" label="설명">
              <Textarea className="resize-none" />
            </Field>
            <Field id="endDate" label="마감일">
              <DatePicker />
            </Field>
            <Field id="tag" label="태그">
              <Input />
            </Field>
            <Field id="image" label="이미지">
              <ImgUpload />
            </Field>
          </ModalContext>
          <ModalFooter>
            <Button
              className="h-[54px] w-64"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              className="text-brand-gray-100 h-[54px] w-64"
              onClick={() => {}}
              color="buttonBlue"
            >
              수정
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
