package com.harmonywisdom.dshbcbp.office.service.impl;

import com.harmonywisdom.dshbcbp.office.bean.Contacts;
import com.harmonywisdom.dshbcbp.office.dao.ContactsDAO;
import com.harmonywisdom.dshbcbp.office.service.ContactsService;
import com.harmonywisdom.framework.dao.BaseDAO;
import com.harmonywisdom.framework.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("contactsService")
public class ContactsServiceImpl extends BaseService<Contacts, String> implements ContactsService {
    @Autowired
    private ContactsDAO contactsDAO;

    @Override
    protected BaseDAO<Contacts, String> getDAO() {
        return contactsDAO;
    }

    @Override
    public String removeContactFromBlock(String idString) {
        String[] ids = idString.split(",");
        if(ids.length>0){
            for(String id:ids){
                contactsDAO.executeJPQL("update Contacts set blockLevelId=null,blockId=null where id=?",id);
            }
        }
        return idString;
    }
}