import {Form, Formik} from 'formik';
import React, {useState} from 'react';

import * as Styled from './example.styled'

import {
    Button,
    CheckBoxFormik,
    Drawer,
    Input,
    InputMatchedWords,
    InputMatchedWordsDynamic,
    InputTextArea,
    Portal,
    Switch
} from '@/module/common/component';
import {InputsConst} from '@/module/common/constants';
import {DrawerLayout, PopupLayout, PopupLayoutBottom} from '@/module/common/layout';
import {DivCommon} from '@/module/common/styles';
import {validationSchemaExample} from '@/module/example/validation/shema';
import {SPACES} from '@/theme';
import {AvatarSetup} from "@/module/common/component/avatar-setup";

export const Example = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openPopupInDrawer, setOpenPopupInDrawer] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const onToggle = () => {
        setOpenDrawer((prev) => !prev);
    };

    const onTogglePopupInDrawer = () => {
        setOpenPopupInDrawer((prev) => !prev);
    };
    const onTogglePopup = () => {
        setOpenPopup((prev) => !prev);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <DivCommon height='100dvh' fd='row' gap={SPACES.xxxxl} padding={`${SPACES.xxxxl} ${SPACES.xxxxl}`}>
            <Styled.InputContainer height='100%' width='25%'>
                <Formik
                    initialValues={{
                        last_name: '',
                        password: '',
                        email: '',
                        text: '',
                        add_category: [],
                        category: [],
                        is_remember: false,
                        avatar: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchemaExample}
                >
                    {({values}) => (
                        <Form>
                            <DivCommon gap={SPACES.l}>
                                <Input {...InputsConst.last_name} />
                                <Input {...InputsConst.password} type='password'/>
                                <Input {...InputsConst.email} placeholder='' inputType={2}/>
                                <InputTextArea
                                    name='text'
                                    label={'text'}
                                    placeholder='text'
                                    rows={2}
                                    maxLength={1000}
                                    mt={SPACES.xxxxxxls}
                                />
                                <InputMatchedWordsDynamic
                                    name='add_category'
                                    label='Add Category'
                                    placeholder='Add Category'
                                />
                                <InputMatchedWords
                                    matchedWords={values.add_category}
                                    name='category'
                                    label='Choice Category'
                                    placeholder='Choice Category'
                                />
                                <CheckBoxFormik name='is_remember' label='Remember for 30 days'/>
                                <Switch name='is_remember' label='Remember for 30 days'/>

                                <AvatarSetup
                                    name='avatar'
                                    label='avatar'
                                />

                                <Button content='Submit' variant='primary' type='submit'/>
                            </DivCommon>
                        </Form>
                    )}
                </Formik>
            </Styled.InputContainer>

            <DivCommon gap={SPACES.l} width='25%'>
                <Button content='open drawer' variant='primary' onClick={onToggle}/>
                <Button content='open popup' variant='inverse' onClick={onTogglePopup}/>
                <Button content='test' variant='primary' disabled/>
                <Button content='test' variant='inverse' disabled/>
            </DivCommon>

            <Drawer onClose={onToggle} open={openDrawer}>
                <DrawerLayout title={'Test'} onClose={onToggle}>
                    <Button content='open Popup' variant='primary' onClick={onTogglePopup}/>
                    <Button mt={SPACES.l} content='open Popup Bottom' variant='primary'
                            onClick={onTogglePopupInDrawer}/>
                </DrawerLayout>
            </Drawer>

            {
                openPopupInDrawer ? (
                    <Portal>
                        <PopupLayout onClose={onTogglePopupInDrawer}>in openPopupInDrawer</PopupLayout>
                    </Portal>
                ) : null
            }


            {openPopup ?
                <Portal>
                    <PopupLayoutBottom onClose={onTogglePopup}>PopupLayoutBottom</PopupLayoutBottom>
                </Portal>
                : null}
        </DivCommon>
    );
};
