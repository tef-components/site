#!/bin/bash

if [ -z "$PLATON_HOME" ]
  then
    echo "Missing PLATON_HOME variable"
else
    if [ -z "$1" ]
      then
        echo "No environment received"
      else
        INI='envs/'$1'/openstack.ini'

        if [ -z $INI ]
        then
            echo "No openstack.ini file detected"
        else
            ENV=$1

            source $INI

            if [ -z "$DEPLOYMENT_GROUPS" ]; then
                echo "Add your OpenStack deployment group to conf/$ENV/openstack.ini"
            fi

            if [ -z "$INSTALLING_GROUP" ]; then
                echo "Add your OpenStack installing group to conf/$ENV/openstack.ini"
            fi

            if [ -z "$MAIN_GROUP" ]; then
                echo "Add your OpenStack main group to conf/$ENV/openstack.ini"
            fi

            if [ -z "$OS_TENANT_NAME" ]; then
                echo "Add your OpenStack tenant_name to conf/$ENV/openstack.ini"
            fi

            if [ -z "$OS_USERNAME" ]; then
                echo "Add your OpenStack username to conf/$ENV/openstack.ini"
            fi

            if [ -z "$OS_PASSWORD" ]; then
                echo "Add your OpenStack password to conf/$ENV/openstack.ini"
            fi

            if [ -z "$OS_KEY_NAME" ]; then
                echo "Add your OpenStack key name to conf/$ENV/openstack.ini"
            fi

            if [ -z "$OS_AUTH_URL" ]; then
                echo "Add your OpenStack keystone url to conf/$ENV/openstack.ini"
            fi

            export OS_ENV=$1
            export DEPLOYMENT_GROUPS
            export INSTALLING_GROUP
            export MAIN_GROUP
            export OS_TENANT_NAME
            export OS_USERNAME
            export OS_PASSWORD
            export OS_KEY_NAME
            export OS_AUTH_URL
            export OS_PYTHON_PATH

            export ANSIBLE_LIBRARY=$ANSIBLE_LIBRARY:$PLATON_HOME/library:$VIRTUAL_ENV:$VIRTUAL_ENV/share/ansible
            export DEPLOY_HOME=$(pwd)

            cd envs/$1

            export ACTIVE_ENV_HOME=$(pwd)

            $PLATON_HOME/scripts/create_ansible_cfg_file.py
            ln -sfn ../../roles roles
        fi
    fi
fi

