import { Checkbox, NumberInput, Modal, Text, Button, Group, Textarea } from "@mantine/core";
import { useState } from "react";
import { useForm } from '@mantine/form';

interface Props {
  itemDetail: any,
  openModal: boolean,
  closeModal: any,
  optionsSelected: any
}
export default function ModalCommon({ itemDetail, openModal, closeModal, optionsSelected }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const form = useForm({ 
    mode: 'uncontrolled',
    initialValues: {
      quantity: 1,
    },
    validate: {
      quantity: (value) => (value === 0 ? 'Select quantity' : null),
    },
   }
    
  );

  const onOrderFood = (values: typeof form.values) => {
    const options = {
      ...values,
      options: selectedOptions.join(',')
    }
    optionsSelected(options)

    // clear modal options
    setSelectedOptions([])
    form.reset()
  };
  return (
    <Modal opened={openModal} onClose={() => closeModal(false)}>
      <Text ta={'center'}>{itemDetail?.name}</Text>
      <form onSubmit={form.onSubmit(onOrderFood)}>
        {
          itemDetail?.options?.map(option => (
            <Checkbox.Group
              value={selectedOptions}
              onChange={setSelectedOptions}
              key={option.id}
              label={option.name}
              mt='md'
            >
              {
                option?.option_items?.items?.map((optionItem, idx) => (
                  <Checkbox
                    mt='xs'
                    className="checkbox-item"
                    label={
                      <>
                        <span>{optionItem.name}</span>
                        <span>{optionItem.price.text}</span>
                      </>
                    }
                    value={optionItem.name}
                    key={idx}
                  />
                ))
              }
            </Checkbox.Group>
          ))
        }

        <NumberInput
          label="Quantity"
          placeholder="Enter quantity ne"
          allowNegative={false}
          defaultValue={1}
          mt='md'
          key={form.key('quantity')}
          {...form.getInputProps('quantity')}
        />
        <Textarea
          label="Note"
          key={form.key('note')}
          {...form.getInputProps('note')}
        />
        <Group justify="flex-end" mt="md">
          <Button fullWidth mt='md' type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}