import React from "react";
import { TreeView as MuiTreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Box, Divider } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import CircularLoading from "components/CircularLoading";

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.root}`]: {
      [`& .${treeItemClasses.content}`]: {
        fontSize: 14,
      },
    },

    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 1,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  })
);

const TreeView = ({
  total,
  data,
  childs,
  loading,
  onClickTreeItem,
  searchValue,
  sx,
}) => {
  const [expanded, setExpanded] = React.useState([]);
  const buildTree = (values = {}) => {
    const renderChilds = Object.values(values).reduce((acc, current) => {
      if (current.id) {
        acc.push({
          ...current,
          id: `${current.id}_${current.parentId}`,
          clickId: current.id,
        });
      }
      return acc;
    }, []);
    let newData = [];
    if (searchValue === "") {
      newData = [...data, ...renderChilds];
    } else {
      newData = childs.map((child) => {
        return { ...child, parentId: null };
      });
    }

    const treeData = createTree(newData, "id", "parentId").reverse();
    return treeData;
  };

  const renderSubheader = () => {
    if (total) {
      return null;
    }
    return (
      <Box component="div" fontSize={14}>
        Нет данных
      </Box>
    );
  };

  const createTree = (data, idProp, parentProp) => {
    const tree = Object.fromEntries(
      data.map((item) => [
        item[idProp],
        {
          ...item,
          children: item.childrenCount ? [{}] : [],
        },
      ])
    );

    return Object.values(tree).filter(
      (item) =>
        !(tree[item[parentProp]] && tree[item[parentProp]].children.push(item))
    );
  };

  const handleNodeToggle = (event, nodes) => {
    if (event.detail === 2) {
      setExpanded(nodes);
    }
  };

  return (
    <>
      {loading ? <CircularLoading top={50} left={15} /> : null}

      {renderSubheader()}
      <MuiTreeView
        aria-label="tree view"
        expanded={expanded}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeToggle={handleNodeToggle}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          filter: loading ? "blur(5px)" : "none",
          ...sx,
        }}
      >
        {buildTree(childs).map((item) => {
          if (!item.parentId) {
            return (
              <>
                <StyledTreeItem
                  key={item.id}
                  nodeId={`${item.id}`}
                  label={item.name}
                  onClick={() => onClickTreeItem(item.id, null, searchValue)}
                >
                  {item.children.map((element) => {
                    if (Object.keys(element).length) {
                      return (
                        <TreeItem
                          key={element.id}
                          nodeId={element.id}
                          label={element.name}
                          onClick={() =>
                            onClickTreeItem(
                              item.id,
                              element.clickId,
                              searchValue
                            )
                          }
                        />
                      );
                    }
                    return null;
                  })}
                </StyledTreeItem>
                <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
              </>
            );
          }
          return null;
        })}
      </MuiTreeView>
    </>
  );
};

TreeView.defaultProps = {
  total: 0,
  data: [],
  childs: {},
  loading: false,
  searchValue: "",
  sx: {},
  onClickTreeItem: () => {},
  onClickChildTreeItem: () => {},
  handleChangePagination: () => {},
};

export default TreeView;
