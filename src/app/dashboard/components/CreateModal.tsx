"use client";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import ImgUpload from "@/components/form/ImgUpload";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import TagInput from "@/components/form/TagInput";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const managerOpt = [
  { value: "1", label: "배유철" },
  { value: "2", label: "배동석" },
];

export default function CreateModal({ isOpen, setIsOpen }: ModalType) {
  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title="할 일 생성" />
          <ModalContext className="flex flex-col gap-7">
            <Field id="manager" label="담당자">
              <Select options={managerOpt} placeholder="선택하기" />
            </Field>
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
              <TagInput />
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
              생성
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
